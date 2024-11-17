import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors } from '@utils/Constants'
import SideBar from './SideBar'
import { getAllCategories, getProductsByCategoyId } from '@service/productService'
import ProductList from './ProductList'

const ProductCategories = () => {
    const [categories, setCategories] = useState<any[]>([])
    const [selectedCategory,setSelectedCategory] = useState<any>(null)

    const [products, setProducts] = useState<any[]>([])

    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true)
    const [productsLoading, setProductsLoading] = useState<boolean>(false)

    const fetchCategories = async() => {
        try {
            setCategoriesLoading(true)
            const data = await getAllCategories()
            setCategories(data)
            if(data && data.length > 0) {
                setSelectedCategory(data[0])
            }
        } catch (error) {
            console.log("Error Fetching Categories", error)
        }finally{
            setCategoriesLoading(false)
        }
    }
    useEffect(() => {
        fetchCategories()
    },[])


    
    const fetchProducts = async(categoryId:string) => {
        try {
            setProductsLoading(true)
            const data = await getProductsByCategoyId(categoryId)
            setProducts(data)
        } catch (error) {
            console.log("Error Fetching Products", error)
        }finally{
            setProductsLoading(false)
        }
    }

    useEffect(() => {
        if(selectedCategory) {
            fetchProducts(selectedCategory?._id)
        }
    }, [selectedCategory])




  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || "Categories"}  search />
      <View style={styles.subContainer}>
        {categoriesLoading ? (<ActivityIndicator size='small' color={Colors.border} />):
        
        (
            <SideBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress = {(category: any) => setSelectedCategory(category)}
            />
        )
        }
         {productsLoading ?
          (<ActivityIndicator size='small' color={Colors.border} style= {styles.mainContainer} />):
          (<ProductList data={products || []} />)
         }
      </View>
    </View>
  )
}

const styles = StyleSheet.create ({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    subContainer: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center'
    },
    center : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default ProductCategories