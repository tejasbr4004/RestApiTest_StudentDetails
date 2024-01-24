const express=require('express');
const router=express.Router();
const users_details_controller=require('../Controllers/UsersDetailsController');
const users_controller=require('../Controllers/UsersController');
const Filesuploads=require('../Filesupload');





router.get(process.env.users_details_route,   users_details_controller.users_get_all_details);
router.get(process.env.users_details_route+'/:_id', users_details_controller.user_get_detailsById);

router.post(process.env.users_details_route, Filesuploads ,users_details_controller.users_post_details);

router.patch(process.env.users_details_route+'/:_id', Filesuploads ,users_details_controller.users_details_update);
router.delete(process.env.users_details_route+'/:_id',users_details_controller.user_delete_ById);



router.get(process.env.users_route, users_controller.users_get_all);
router.get(process.env.users_route+'/:_id',users_controller.user_get_ById);


module.exports=router;