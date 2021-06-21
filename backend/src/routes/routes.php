<?php

require '../src/controllers/sub_categorias.php';

use Slim\App;

return function ($app, $db) {

	$app->group('/api', function() use($app, $db){

		$app->group('/categorias', function() use($app, $db){

			//Create new categories and subcategories
			$app->post('/crear', function() use($app, $db){
				
				$parent_id = 0;
				$json = $app->request->getBody();
				
				$data = json_decode($json, true);

				if(isset($data['isParent'])){
					
					if ($data['isParent'] == true) {

						$data['parent_id'] = 0;
						$data['tipo'] = 'hijo';

					}else{

						$parent_id = $data['parent_id'];

					}
				}

				if(!isset($data['nombre'])){

					$result = array(
						'message' => 'El campo nombre no puede estar vacio',
					);

					echo json_encode($result, true);

				}else {

					$sql =	"INSERT INTO categorias (id, nombre, id_categoria, tipo) VALUES(NULL,".
								"'{$data['nombre']}',".
								"'{$data['parent_id']}',".
								"'{$data['tipo']}'".
								");";

					$query = $db->query($sql);

					if($query){

						$result = array(
							'status' => 'success',
							'code' => 200,
							'message' => 'Categoria creada exitosamente'
						);
						
					}else {
						
						$result = array(
							'status' => 'error',
							'code' => 400,
							'message' => 'Error al crear la categoria'
						);

					}
			
					echo json_encode($result);

				}
			});

			//Read all the categories and subcategories
			$app->get('/leer', function() use($db){
				
				$parent_id = 0;
				$sql = 'SELECT * FROM categorias WHERE id_categoria ='.$parent_id.' '.'ORDER BY nombre';
				$query = $db->query($sql);
				
				$categorias = array();

				try {

					while($row = $query->fetch_assoc()){
						$categorias[] = array(
							'id' => $row['id'],
							'nombre' => $row['nombre'],
							'id_categoria' => $row['id_categoria'],
							'tipo' => $row['tipo'],
							'subcategorias' => sub_categories($row['id'], $db),
						);
					}

					$result = array(
						'status' => 'success',
						'code' => 200,
						'Categories' => $categorias
					);

				} catch (Exception $e) {

					$result = array(
						'status' => 'error',
						'code' => 400,
						'error' => $e->getMessage()
					);

				}
				
				echo json_encode($result);

			});

			//Read all the childs
			$app->get('/leer_hijos', function() use($db){
				
				$sql = 'SELECT id, nombre FROM categorias WHERE tipo = "hijo";';
				$query = $db->query($sql);
				
				$categorias = array();

				try {

					while($row = $query->fetch_assoc()){
						$categorias[] = array(
							'id' => $row['id'],
							'nombre' => $row['nombre']
						);
					}

					$result = array(
						'status' => 'success',
						'code' => 200,
						'Hijas' => $categorias
					);

				} catch (Exception $e) {

					$result = array(
						'status' => 'error',
						'code' => 400,
						'error' => $e->getMessage()
					);

				}
				
				echo json_encode($result);

			});

			//Update categories and subcategories
			$app->put('/actualizar/:id', function($id) use($app, $db){
				
				$json = $app->request->getBody();
				
				$data = json_decode($json, true);

				if(empty($data['nombre'])){

					$result = array(
						'message' => 'El campo nombre no puede estar vacio',
					);

					echo json_encode($result, true);

				}else {

					$sql =	"UPDATE categorias SET ".
							"nombre = '{$data["nombre"]}' WHERE id = {$id}";

					$query = $db->query($sql);

					if($query){

						$result = array(
							'status' => 'success',
							'code' => 200,
							'message' => 'Categoria modificada exitosamente'
						);

					}else {
						
						$result = array(
							'status' => 'error',
							'code' => 400,
							'message' => 'Error al modificar la categoria'
						);

					}
			
					echo json_encode($result);
				}
			});

			//Update parent
			$app->put('/actualizar_padre/:id', function($id) use($app, $db){
				
				$json = $app->request->getBody();
				
				$data = json_decode($json, true);

				$sql =	"UPDATE categorias SET ".
						"tipo = 'padre' WHERE id = {$id}";

				$query = $db->query($sql);

				if($query){

					$result = array(
						'status' => 'success',
						'code' => 200,
					);

				}else {
					
					$result = array(
						'status' => 'error',
						'code' => 400,
					);

				}
		
				echo json_encode($result);

			});

			//Delete categories and subcategories
			$app->delete('/borrar/:id', function($id) use($app, $db){
				
				$json = $app->request->getBody();
				
				$data = json_decode($json, true);

				$subcategorias = sub_categories($id, $db);

				if(count($subcategorias) > 0){

					$result = array(
						'message' => 'Borra las subcategorias del elemento seleccionado antes de continuar',
					);

					echo json_encode($result, true);

				}else {

					$sql =	"DELETE FROM categorias WHERE id = $id";

					$query = $db->query($sql);

					if($query){

						$result = array(
							'status' => 'success',
							'code' => 200,
							'message' => 'Categoria eliminada exitosamente'
						);

					}else {
						
						$result = array(
							'status' => 'error',
							'code' => 400,
							'message' => 'Error al eliminar la categoria'
						);

					}
			
					echo json_encode($result);
				}
			});
		
		});

		$app->group('/productos', function() use($app, $db){

			//Create new products with assigned category
			$app->post('/crear', function() use($app, $db){
				
				$json = $app->request->getBody();
				
				$data = json_decode($json, true);

				if(empty($data['stock'])){

					$data['stock'] = 0;
				
				}

				if(empty($data['nombre'])){

					$result = array(
						'message' => 'El campo nombre no puede estar vacio',
					);

					echo json_encode($result, true);

				}else {

					$sql =	"INSERT INTO productos (id, nombre, stock, categoria) VALUES(NULL,".
								"'{$data['nombre']}',".
								"'{$data['stock']}',".
								"'{$data['categoria']}'".
								");";
													
					$query = $db->query($sql);

					if($query){

						$result = array(
							'status' => 'success',
							'code' => 200,
							'message' => 'Producto creado exitosamente'
						);
						
					}else {
						
						$result = array(
							'status' => 'error',
							'code' => 400,
							'message' => 'Error al crear el producto'
						);

					}
			
					echo json_encode($result);

				}
			});

			//Read all products and assigned category
			$app->get('/leer', function() use($db){
				
				$parent_id = 0;
				$sql = 'SELECT a.id, a.nombre, a.stock, b.nombre AS categoria, b.id AS id_categoria FROM productos AS a INNER JOIN categorias AS b ON a.categoria = b.id;';
				$query = $db->query($sql);
				
				$productos = array();

				try {

					while($row = $query->fetch_assoc()){
        
						$productos[] = array(
							'id' => $row['id'],
							'nombre' => $row['nombre'],
							'stock' => $row['stock'],
							'categoria' => $row['categoria'],
							'id_categoria' => $row['id_categoria'],
						);
					
					}

					$result = array(
						'status' => 'success',
						'code' => 200,
						'Products' => $productos
					);

				} catch (Exception $e) {

					$result = array(
						'status' => 'error',
						'code' => 400,
						'error' => $e->getMessage()
					);

				}
				
				echo json_encode($result);

			});

			//Update product information
			$app->put('/actualizar/:id', function($id) use($app, $db){
				
				$json = $app->request->getBody();
				
				$data = json_decode($json, true);

				if(empty($data['nombre'])){

					$result = array(
						'message' => 'El campo nombre no puede estar vacio',
					);

					echo json_encode($result, true);

				}else {

					$sql =	"UPDATE productos SET ".
							"nombre = '{$data["nombre"]}', ".
							"stock = '{$data["stock"]}', ".
							"categoria = '{$data["id_categoria"]}' ".
							"WHERE id = {$id};";


					$query = $db->query($sql);

					if($query){

						$result = array(
							'status' => 'success',
							'code' => 200,
							'message' => 'Producto modificado exitosamente'
						);

					}else {
						
						$result = array(
							'status' => 'error',
							'code' => 400,
							'message' => 'Error al modificar el producto'
						);

					}
			
					echo json_encode($result);
				}
			});

			//Delete product information
			$app->delete('/borrar/:id', function($id) use($app, $db){
				
				$json = $app->request->getBody();
				
				$data = json_decode($json, true);

				$sql =	"DELETE FROM productos WHERE id = $id";

					$query = $db->query($sql);

					if($query){

						$result = array(
							'status' => 'success',
							'code' => 200,
							'message' => 'Producto eliminado exitosamente'
						);

					}else {
						
						$result = array(
							'status' => 'error',
							'code' => 400,
							'message' => 'Error al eliminar el producto'
						);

					}
			
					echo json_encode($result);
			});
		
		});

		$app->get('/reporte', function() use($db){

		});

	});

};

