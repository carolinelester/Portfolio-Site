<?php
//DEFAULT SETTINGS

  //Name to add to the email (your business name)
  $email_name = 'Brutal';

  //Email subject to subscriber
  $email_subject = 'Thanks for getting in touch.';

  //Email message to send to the subscriber:
  $email_message = "Hi there!\n\nThanks for contacting us. We'll be in touch real soon!";

  //Reply to email address:
  $reply_to = 'noreply@yoursite.com';

  //Notification email address - alerted when you get a new subscriber
  $notification_email = 'info@yoursite.com';

//DEFAULT SETTINGS

/*No need to edit beyond this line*/



define( 'RESPONSE_NAME', $email_name );
define( 'RESPONSE_SUBJECT', $email_subject );
define( 'RESPONSE_MSG', $email_message );
define( 'RESPONSE_EMAIL', '<' . $reply_to . '>' );

//Set to true if valid email
$success = false;

//Get subscriber email and sanatise
$email = isset( $_POST['contact-email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['contact-email'] ) : "";

//Contact message
$message = isset( $_POST['message'] ) ? strip_tags(trim($_POST["message"])) : "";

//Contact name
$name = isset( $_POST['contact-name'] ) ? strip_tags(trim($_POST["contact-name"])) : "";


//Check we have an email string, and that it is a valid email format
if ( strlen( $email ) && filter_var( $email, FILTER_VALIDATE_EMAIL ) && strlen($message) && strlen($name) ) {

		//Auto respond to user
    $subscriber = '<' . $email . '>';
    $headers    = 'From: ' . RESPONSE_NAME . ' ' . RESPONSE_EMAIL . '';
    @mail( $subscriber, RESPONSE_SUBJECT, RESPONSE_MSG, $headers, '-f' . $reply_to . '' );

    //send notification email
    @mail( '<' . $notification_email . '>', 'New message', "Hi,\n\nSomeone sent you a message using your contact form.\nMessage:\n\n$message\n\nFrom: $name, $email.", $headers, '-f' . $reply_to . '' );

    echo 'success';
}//end if email
