<?php
header('Content-Type: application/json');

$targetDir = "img/";
$response = ['success' => false, 'uploaded' => [], 'errors' => []];

if (!file_exists($targetDir)) {
    mkdir($targetDir, 0755, true);
}

if (isset($_FILES['photos'])) {
    $totalFiles = count($_FILES['photos']['name']);

    for ($i = 0; $i < $totalFiles; $i++) {
        $fileName = basename($_FILES['photos']['name'][$i]);
        // Sanitize el nom del fitxer per evitar caràcters especials
        $fileName = preg_replace("/[^a-zA-Z0-9\._-]/", "_", $fileName);
        
        // Evita sobreescriure afegint un timestamp si ja existeix
        $targetFilePath = $targetDir . $fileName;
        if (file_exists($targetFilePath)) {
            $fileName = time() . "_" . $fileName;
            $targetFilePath = $targetDir . $fileName;
        }

        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
        $allowedTypes = array('jpg', 'jpeg', 'png', 'gif', 'webp');

        if (in_array($fileType, $allowedTypes)) {
            if (move_uploaded_file($_FILES['photos']['tmp_name'][$i], $targetFilePath)) {
                $response['uploaded'][] = $targetFilePath;
            } else {
                $response['errors'][] = "Error en moure el fitxer: " . $_FILES['photos']['name'][$i];
            }
        } else {
            $response['errors'][] = "Format no permès: " . $_FILES['photos']['name'][$i];
        }
    }

    if (count($response['uploaded']) > 0) {
        $response['success'] = true;
    }
}

echo json_encode($response);
?>