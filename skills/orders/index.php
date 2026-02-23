<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (
  empty($data['producttype']) ||
  empty($data['symbol']) ||
  empty($data['colour'])
) {
  echo json_encode(['success' => false]);
  exit;
}

echo json_encode([
  'success' => true
]);
