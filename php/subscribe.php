<?php
//DEFAULT SETTINGS

  //Name to add to the email (your business name)
  $email_name = 'Brutal';

  //Email subject to subscriber
  $email_subject = 'Thanks for subscribing!';

  //Email message to send to the subscriber:
  $email_message = "Hi there!\n\nThanks for subscribing. Keep an eye on your inbox, we'll be in touch real soon!";

  //Reply to email address:
  $reply_to = 'noreply@yoursite.com';

  //Notification email address - alerted when you get a new subscriber
  $notification_email = 'subscriber@yoursite.com';

//DEFAULT SETTINGS

/*No need to edit beyond this line*/


define( 'RESPONSE_NAME', $email_name );
define( 'RESPONSE_SUBJECT', $email_subject );
define( 'RESPONSE_MSG', $email_message );
define( 'RESPONSE_EMAIL', '<' . $reply_to . '>' );

//Set to true if valid email
$success = false;

//Get subscriber email and sanatise
$email = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";

//Contact name
$name = isset( $_POST['name'] ) ? strip_tags(trim($_POST["name"])) : "";

//Check we have an email string, and that it is a valid email format
if ( strlen( $email ) && filter_var( $email, FILTER_VALIDATE_EMAIL ) && strlen($name) ) {

  //write the email to the text file:
  $already_subbed = false;
  $txt_path = $_SERVER['DOCUMENT_ROOT'] . '/php/subscribers/subscribers.txt';
  if ( ! file_exists( $txt_path ) ) {
    fopen( $txt_path, "w" );
  } else {
    $file = fopen( $txt_path, "r" );
    if ( $file ) {
      while ( ( $line = fgets( $file ) ) !== false ) {
        $sub = trim( str_replace( ',', '', $line ) );
        if ( preg_match( '/' . $sub . '/i', $name.' '.$email ) ) {
          $already_subbed = true;
        }
      }
      fclose( $file );
    }
  }

  if ( ! $already_subbed ) {
    file_put_contents( $txt_path, $name.', '.$email . ", \n", FILE_APPEND | LOCK_EX );

    $subscriber = '<' . $email . '>';
    $headers    = 'From: ' . RESPONSE_NAME . ' ' . RESPONSE_EMAIL . '';
    $success    = mail( $subscriber, RESPONSE_SUBJECT, RESPONSE_MSG, $headers, '-f' . $reply_to . '' );

    //send notification email
    @mail( '<' . $notification_email . '>', 'New subscriber', 'New subscriber: ' . $name.', '.$email, $headers, '-f' . $reply_to . '' );
  }

  echo 'success';
}//end if email
