<?php

    function sub_categories($id, $db){

        $sql = "SELECT * FROM categorias WHERE id_categoria = $id";
        $query = $db->query($sql);
        
        $categorias = array();
        
        while($row = $query->fetch_assoc()){
        
            $categorias[] = array(
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'id_categoria' => $row['id_categoria'],
                'tipo' => $row['tipo'],
                'subcategorias' => sub_categories($row['id'], $db),
            );
        
        }
        
        return $categorias;
    }

?>