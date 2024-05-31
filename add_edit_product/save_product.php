<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $details = $_POST['details'];
    $color = $_POST['color'];

    // Handle file upload
    $photo = $_FILES['photo'];
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($photo['name']);
    move_uploaded_file($photo['tmp_name'], $targetFile);

    $data = array(
        'name' => $name,
        'price' => $price,
        'details' => $details,
        'color' => $color,
        'photo' => $targetFile
    );

    $jsonData = file_get_contents('products.json');
    $products = json_decode($jsonData, true);

    // Add the new product data
    $products[] = $data;

    // Convert the data array to JSON
    $jsonData = json_encode($products, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);

    // Save the updated JSON data back to products.json
    file_put_contents('products.json', $jsonData);

    // Response to the client
    $response = array(
        'message' => 'Product added successfully.'
    );
    echo json_encode($response);
} else {
    http_response_code(405);
}
?>
