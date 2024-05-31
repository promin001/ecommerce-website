<?php
// get_products.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $jsonData = file_get_contents('products.json');
    $products = json_decode($jsonData, true);

    echo json_encode($products);
} else {
    http_response_code(405);
}
?>
