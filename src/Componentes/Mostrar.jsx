import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Link } from 'react-router-dom';

import { async } from '@firebase/util';

import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);




const Mostrar = () => {


    // 1.configuracion de los hooks

    const [productos, setProductos] = useState([]);


    // 2. referencia a la db de firebase

    const productosCollection = collection(db, "Productos");


    // 3. asincronismo a los datos

    const getProductos = async () => {

        const data = await getDocs(productosCollection);
        //console.log(data.docs)


        setProductos(

            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        //console.log(productos)
    }


    //4. useEffect

    useEffect(() => {
        getProductos();
    }, [])

    // borrado de registro

    const deleteProducto = async (id) => {

        const productoDoc = doc(db, "Productos", id)
        await deleteDoc(productoDoc);
        getProductos();

    }

    // 5. configuracion sweetalert


    const confirmDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                deleteProducto(id);

                Swal.fire({
                    title: "Deleted!",
                });
            }
        });

    }




    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>

                    <div className='d-grid gap-2 '>
                        <Link to="/crearproducto" className='btn btn-primary btn-outline-light btn-lg mt-3 mb-4' >Agregar Producto <i className="fa-solid fa-plus"></i></Link>
                    </div>


                    <table className='table table-dark table-striped table-hover table-bordered align-middle text-center'>

                        <thead>
                            <tr className="table-light align-middle">
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>


                        <tbody className='text-light'>

                            {productos.map((produc) => (
                                <tr key={produc.id}>
                                    <td key={produc.nombre} className='text-light'>{produc.nombre || ''}</td>
                                    <td key={produc.precio} className='text-light'>{produc.precio || ''}</td>
                                    <td key={produc.stock} className='text-light'>{produc.stock || ''} </td>
                                    <td>
                                        <Link to={`/editarproducto/${produc.id}`} className="btn btn-light"><i className="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => { confirmDelete(produc.id) }} className="btn btn-light  border border-danger"><i className="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>


                    </table>

                </div>
            </div>
        </div >
    )
}
export default Mostrar;