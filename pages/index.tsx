import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
} from 'firebase/firestore'


const Home: NextPage = () => {
  const [products, setProducts] = useState([])
  
  const GetAndSetProducts = async (productsCollection: any) => {
    const data = await getDocs(productsCollection)
    const products = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    setProducts(products)
  } 

  useEffect(() => {
    const firebaseCredentials = initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID
    })
    const firebaseDatabase = getFirestore(firebaseCredentials)
    const productsCollection = collection(firebaseDatabase, "product")

    GetAndSetProducts(productsCollection)
  }, [])
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>

      <h1>Produtos</h1>
      { 
        products.map(({ id, name, quantity, value, description }) => (
          <div 
          key={id}
          style={{
            margin: '.4rem .0rem .4rem',
            background: '#f1f1f1',
            padding: '1rem'
          }}
          >
            
            <div>nome: {name}</div>
            <div>descrição: {description}</div>
            <div>valor: {value}</div>
            <div>quantidade: {quantity}</div>
          </div>
        )
      )}
    </div>  
  )
}

export default Home
