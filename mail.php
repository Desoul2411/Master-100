<?php

$recepient = "Master100@gmail.com";
$sitename = "Мастер на все 100";

$name = trim($_POST["name"]);
$city = trim($_POST['city']);
$phone = $_POST["phone"];
$text = $_POST["text"];
$message = "";
$pagetitle = "";

if($city != "") {
    $message = "Имя: $name \nГород: $city \nТелефон: $phone \nКраткое описание задачи: $text";
    $pagetitle = "Новая заявка с сайта \"$sitename\"";
} else if( $city == "" && $text == "") {
    $message = "Имя: $name\nТелефон: $phone";
    $pagetitle = "Заказан звонок с сайта \"$sitename\"";
} else {
    $message = "Имя: $name \nТелефон: $phone \nКраткое описание задачи: $text";
    $pagetitle = "Новая заявка с сайта \"$sitename\"";
}


mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");