
	$(document).on("ready",regular);
	

	function regular() {

		 var base_url = 'http://186.4.157.125:80/webcapremci/webservices_evaluacion/';
			var pag_service = 'SincronizacionService.php?jsoncallback=?' ;
			var nombre_usuarios = "";
			
			$(document).on('click', '#btn_regular', function(){
			
				var online=0;
				var networkState = navigator.network.connection.type;
			    var states = {};
			    
			    states[Connection.UNKNOWN]  = '1';  //Conexión desconocida;
			    states[Connection.ETHERNET] = '1';  //Conexión ethernet;
			    states[Connection.WIFI]     = '1';  //Conexión WiFi';
			    states[Connection.CELL_2G]  = '1';  //Conexión movil 2G';
			    states[Connection.CELL_3G]  = '1';  //Conexión movil 3G';
			    states[Connection.CELL_4G]  = '1';  //Conexión movil 4G';
			    states[Connection.NONE]     = '0';  //Sin conexión';
			      
			    online=states[networkState];
			   
			     if (online==1){
			     
				 var cedula = $("#cedula").val();
				 var calificacion = "Regular";
				 var imei= "9999999999";
		    	 var error="";

		    	    if (cedula == "")
			        {
				    	$("#mensaje_cedula").text("Introduzca Cedula");
			    		$("#mensaje_cedula").fadeIn("slow"); //Muestra mensaje de error
			    		error="SI";
			            return false;
				    }
			    	else 
			    	{
			    		$("#mensaje_cedula").fadeOut("slow"); //Muestra mensaje de error
			    		error="NO";
					}
		    	   
		    	   if(error=="NO"){
			  		
		    		  $.ajax({
	  	    			   type: 'GET',
	  	    			   url: base_url+pag_service,
	  	    			   data:{cedula:cedula, calificacion:calificacion, imei:imei},
	  	    			   dataType: 'json',
	  	    			   success: function (x) {
	  	    				 
	  	    				$.each(x, function(i, j) {			
								nombre_usuarios  =  j.nombre_usuarios;
							});
	  	    				
	  	    				 $("#cedula").val("");
	  	    			   window.location.href = 'index.html?succes='+nombre_usuarios+'';
	  	    			
	  	    			   },
	  	    			   error: function (jqXHR, textStatus, errorThrown) {
	  	    				 $("#cedula").val("");
	  	    			   window.location.href = "index.html?error='Error'";
	  	     	    		    
	  	    			  }
	  	    			   
	  	    		   	});
		    	     }
				
			     }else{
			    	 $("#cedula").val("");
			    	 window.location.href = "index.html?inter='Error'";
	  	     	    	
			    	
			     }
		    	   
		    	   
			     });
			
	
			       $( "#cedula" ).focus(function() {
				   $("#mensaje_cedula").fadeOut("slow");
			       });
			 
	}
    
    