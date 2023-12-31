import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { async } from '@firebase/util';
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);



const Crear = () =>{


// 1. declarar los hooks


const [nombre,setNombre] = useState ("");
const[precio, setPrecio] = useState ("");
const [stock, setStock] = useState ("");

const navigate = useNavigate();


//2. conectar con la base

const productosCollection = collection (db,"Productos");


//3. crear alert

const alertCreacion = () =>{
    Swal.fire("Producto agregado con exito!");
}

//4. asincronismo para subirlo a la base

const nuevo = async (e) => {
    e.preventDefault ();
    await addDoc(productosCollection, {nombre:nombre, precio:precio, stock:stock});
    alertCreacion();
    navigate("/");
}


return (

    <div className='container'>
    <div className='row'>
         <div className='col'>

         <h1 className='mt-3 text-light'>Crear Producto Nuevo</h1>

         <form onSubmit={nuevo} className='mt-5 '>
            <div className='mb-4'>
                <label className='form-label h3 text-light'>Nombre:</label>
                <input 
                    value={nombre}
                    type="text"
                    className='form-control w-50 m-auto '
                    onChange={(e)=>setNombre(e.target.value)}
                />
            </div>

            <div className='mb-4'>
            <label className='form-label h3 text-light'>Precio:</label>
            <input 
                value={precio}
                type="text"
                className='form-control w-50 m-auto'
                onChange={(e)=>setPrecio(e.target.value)}
            />
            </div>

            <div className='mb-4'>
            <label className='form-label h3 text-light'>Stock:</label>
            <input 
                value={stock}
                type="text"
                className='form-control w-50 m-auto'
                onChange={(e)=>setStock(e.target.value)}
            />
            </div>

            <button type="submit" className='btn btn-outline-light btn-lg mt-3'>Agregar</button>
         
         </form>
         </div>
    </div>
</div>
)
}


export default Crear ;