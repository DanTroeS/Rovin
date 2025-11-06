<?php
header('Content-Type: application/json; charset=utf-8');


$host = 'localhost:3306';
$user = 'root';
$pass = 'admin'; 
$dbname = 'rovin_bd';

$conn = new mysqli($host, $user, $pass, $dbname);
$conn->set_charset('utf8');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Ошибка подключения: ' . $conn->connect_error]));
}


$sql = "SELECT id, name, price, description, category FROM services ORDER BY id ASC";
$result = $conn->query($sql);

$services = [];
while ($row = $result->fetch_assoc()) {

    if (empty($row['category'])) {
        $row['category'] = 'Без категории';
    }


    if ((int)$row['price'] === 0) {
        $row['price'] = 'по запросу';
    } else {
        $row['price'] = number_format($row['price'], 0, '', ' ') . ' ₽';
    }

    $services[] = $row;
}

echo json_encode($services, JSON_UNESCAPED_UNICODE);

$conn->close();
?>
