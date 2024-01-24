const mongoose=require('mongoose');
const UsersDetails =require('../Model/UserDetailSchema');
const path = require('path');
const fs = require('fs');



const users_get_all_details=(req,res)=>{
        UsersDetails.find().sort({createdAt:-1})
        .exec()
        .then((usersdetails)=>{

            const response={
                userslength:usersdetails.length,      //don't use length(), use like users.length here...
                Users: usersdetails.map((doc)=>{
                   return { 
                        name:doc.name,
                        DateOfBirth:doc.DateOfBirth,
                        gender:doc.gender,
                        registernumber:doc.registernumber,
                        email:doc.email,
                        course:doc.course,
                        branch:doc.branch,
                        Currentyear:doc.Currentyear,
                        courseDuration:doc.courseDuration,
                        userImage_or_anyFile_info:{
                            img:doc.userImage_or_anyFile,
                            imageurl:process.env.hostUrl+'/uploads/'+doc.userImage_or_anyFile,
                            img_description:`paste above image link in your any browser, and if you are seeing "undefined or null" in url then you didn't upload image/document for the respective user`
                        },
                        userapi_info:{
                            method:'GET',
                            contentType:'multipart/form-data',
                            url_individual_details:process.env.hostUrl+process.env.users_details_route+'/'+doc._id,
                            description:'This will display the individual details of users from the database,go for it if u wish to see,each users information'
                       },
                       createdAt:doc.createdAt?doc.createdAt.toLocaleString():null,
                       updatedAt:doc.updatedAt?doc.updatedAt.toLocaleString():null

                    }
                         
                })

            };

            res.status(200).json(response);
            
            //or below style, both are okk, above style improves readbility
            // res.status(200).json({
            //            length:usersdetails.length,
            //            users: usersdetails.map(userdetail=>{
                                
            //                     return{
            //                         name:userdetail.name,
            //                         registernumber:userdetail.registernumber,
            //                         email:userdetail.email,
            //                         course:userdetail.course,
            //                         branch:userdetail.branch,
            //                         year:userdetail.year,
            //                         userapi_info:{
            //                             method:'GET',
            //                             contentType:'application/json',
            //                             url_individual_details:process.env.hostUrl+req.url+'/'+userdetail._id,
            //                             description:'This will display the individual details of users from the database,go for it if u wish to see,each users information'
            //                        }
            //                    }
            //                })
                       
            // });

        })   
        .catch((error)=>{
            console.log(error)
           res.status(500).json({
            message:'getting users info failed..',
            error:error
           })
        })
}


const user_get_detailsById=(req,res)=>{
         UsersDetails.findById({_id:req.params._id})
         .exec()
         .then((user)=>{
            res.status(200).json({
                     message:'here it is,details of provided ID..Thankyou',
                    _id:user._id,
                    name:user.name,
                    DateOfBirth:user.DateOfBirth,
                    gender:user.gender,
                    registernumber:user.registernumber,
                    email:user.email,
                    course:user.course,
                    branch:user.branch,
                    Currentyear:user.Currentyear,
                    courseDuration:user.courseDuration,
                    userImage_or_anyFile_info:{
                        img:user.userImage_or_anyFile,
                        imageurl:process.env.hostUrl+'/uploads/'+user.userImage_or_anyFile,
                        img_description:`paste above image link in your any browser, and if you are seeing "undefined or null" in url then you didn't upload image/document for the respective user`
                    },
                    userapi_info:{
                        method:'GET',
                        contentType:'multipart/form-data',
                        url_individual_details:process.env.hostUrl+process.env.users_details_route+'/'+user._id,
                        description:'This will display the individual details of users from the database,go for it if u wish to see,each users information'
                   },
                   createdAt:user.createdAt?user.createdAt.toLocaleString():null,
                   updatedAt:user.updatedAt?user.updatedAt.toLocaleString():null
            })
         })
         .catch((err)=>{
            console.log(err)
            res.status(404).json({
                message:"check with the user id provided in the url...once,because entered url does not match...",
                error:err
            })
        })
        
}





const users_post_details = (req, res) => {
        console.log(req.file);

        const user_details = new UsersDetails({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            DateOfBirth:req.body.DateOfBirth,
            gender:req.body.gender,
            registernumber: req.body.registernumber,
            email: req.body.email,
            course: req.body.course,
            branch: req.body.branch,
            Currentyear: req.body.Currentyear,
            courseDuration:req.body.courseDuration,
            userImage_or_anyFile: req.file ? req.file.filename : undefined
        });

        user_details.save()
            .then(() => {
                res.status(200).json(user_details);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: 'Posting data failed..',
                    error: err
                });
            });
   
};




const users_details_update=(req,res)=>{

    const updateObject = {
        $set: req.body,
        userImage_or_anyFile: req.file ? req.file.filename : undefined
    };
    

    UsersDetails.findByIdAndUpdate({_id:req.params._id}, updateObject, {new:true})
    .exec()
    .then((user)=>{
        res.status(201).json({
            message:"user detail..successfully updated..",
            result:{
                name:user.name,
                email:user.email,
                updatedAt:user.updatedAt.toLocaleString(),
                url_to_user:process.env.hostUrl+process.env.users_details_route+'/'+req.params._id,
                description:'use above link and make GET request you will see,updated details of the user,so that which ever fields you updated in user info can be verified,so that double checking..whether updated or not'
            }
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).json({
            message:"update..failure..check with the user id provided in the url...once,because entered url does not match",
            error:err
        })
    })
}



const user_delete_ById=(req,res)=>{
    UsersDetails.findByIdAndDelete({_id:req.params._id})   //deleted user detail.. is passed to call back function 
    .exec()
    .then((user)=>{     //this call back function has deleted user detail
        
        const deleteDate=new Date().toLocaleString();

        if(user.userImage_or_anyFile){
             // Delete the corresponding file from the 'uploads' directory
            const filePath = path.join(__dirname, '../uploads/', user.userImage_or_anyFile);
             // Add '..', which means go up one level in the directory structure
            console.log('Deleting file at path:', filePath);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully.');
                }
            });
        }

        res.status(200).json({
            message:`deleted details of user is showed..below here,if you request GET request for displaying all users_details,you won't see..below details, so given Id of user is successfully deleted..`,
            result:{
                _id:user._id,
                DeletedAt:deleteDate,
                name:user.name,
                DateOfBirth:user.DateOfBirth,
                gender:user.gender,
                registernumber:user.registernumber,
                email:user.email,
                course:user.course,
                branch:user.branch,
                Currentyear:user.Currentyear,
                courseDuration:user.courseDuration,
                userImage_or_anyFile:user.userImage_or_anyFile
            }

        })
    })
    .catch((err)=>{
        console.error("error",err)
        res.status(404).json({
            message1:"Deletion..failure..check with the user id provided in the url...once,because entered url does not found",
            message2:'may be that id user already deleted',
            error:err
        })
    })
}

module.exports={
    users_get_all_details,
    users_post_details,
    users_details_update,
    user_get_detailsById,
    user_delete_ById
}