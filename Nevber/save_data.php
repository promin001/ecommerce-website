<?php

// Ensure that the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Read the existing JSON data from data.json
    $jsonData = file_get_contents('data.json');
    $data = json_decode($jsonData, true);

    // Add the new form data
    $data[] = array(
        'name' => $name,
        'email' => $email,
        'message' => $message
    );

    // Convert the data array to JSON
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);

    // Save the updated JSON data back to data.json
    file_put_contents('data.json', $jsonData);

    // Response to the client
    $response = array(
        'message' => 'Form data saved successfully.'
    );
    echo json_encode($response);
} else {
    // Handle non-POST requests if needed
    http_response_code(405); // Method Not Allowed
}
?>
