import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { dbCollections } from "../firebaseConfig/collections";


import { async } from '@firebase/util';

import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);



const Editar = () => {


    // 1. declarar los hooks

    const [form, setForm] = useState({ });


    const navigate = useNavigate();
    const { id } = useParams();


    //2. editar valores del form, edita solo el nombre

    /*
    const cambioNombre = (e) => {
        setNombre (e.target.value);
    }
    
    const cambioPrecio = (e) => {
        setPrecio (e.target.value);
    }
    
    const cambioStock = (e) => {
        setStock (e.target.value);
    }
*/
    const nuevoForm = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,

        });
    };

    //3. crear alert guardado

    const alertGuardado = () => {
        Swal.fire("Producto editado con exito!");
    }



    //4 declaramos la función update

    const update = async (e) => {
        e.preventDefault();
        const producto = doc(db, dbCollections.Productos, id);
        const data = {
            nombre: form.nombre,
            precio: form.precio,
            stock: form.stock
        };
        await updateDoc(producto, data);
        alertGuardado();
        navigate("/");
    }


    //5 asincronismo de existencia con la bd

    const getProductoById = async (id) => {
        const producto = await getDoc(doc(db, dbCollections.Productos, id));
        console.log(producto.data());

        if (producto.exists()) {
            setForm({
                nombre: producto.data().nombre,
                precio: producto.data().precio,
                stock: producto.data().stock
            });
        }
        else {
            console.log("no existe");
        }
    };

    //6 useEffect

    useEffect(() => {
        getProductoById(id);
    }, [id])



    //7 estructura para mostrar

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>

                    <h1 className='mt-3 text-light'>Editar el Producto</h1>

                    <form onSubmit={update} className="mt-5">

                        <div className='mb-4'>
                            <label className='form-label h3 text-light'>Nombre:</label>
                            <input
                                id= "nombre"
                                value={form.nombre}
                                type="text"
                                className='form-control w-50 m-auto'
                                onChange={nuevoForm}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='form-label h3 text-light'>Precio:</label>
                            <input
                                id="precio"
                                value={form.precio}
                                type="text"
                                className='form-control w-50 m-auto'
                                onChange={nuevoForm}
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label h3 text-light'>Stock:</label>
                            <input
                                id="stock"
                                value={form.stock}
                                type="text"
                                className='form-control w-50 m-auto'
                                onChange={nuevoForm}
                            />
                        </div>

                        <button type="submit" className='btn btn-outline-light btn-lg mt-3'>Guardar</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editar;



