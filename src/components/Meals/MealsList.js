import React, { useEffect, useState } from 'react'
import classes from './MealsList.module.css';
import MealsWrapper from '../Layout/MealsWrapper';
import MealItem from './MealItem/MealItem';
import FetchMealButton from './FetchMealButton'

const Meals = () => {
  const [meals,setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error,setError] = useState('')

  useEffect(()=>{
    const fetchMeals = async ()=>{
      console.log('inside')
      const response = await fetch('https://reactivemeals-default-rtdb.firebaseio.com/meals.json')
      
      if(!response.ok){
        throw new Error('Oops! Failed to fetch.')
      }
      
      const meals = await response.json()
  
      const processedMeals = []
      for(const key in meals){
        const meal = {
          ...meals[key], id: key
        }
        processedMeals.push(meal)
      }
      setMeals(processedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch(error=> {
      setError(error.message)
      setIsLoading(false)
    })

    
  },[])

  if(isLoading){
    return (
      <section>
        <h1 className={classes.loading}>Loading...</h1>
      </section>
    )
  }

  if(error){
    return(
      <section>
        <h1 className={classes.error}>{error}</h1>
      </section>
    )
  }
    

  const mapMealsToJSX = meals.map(meal => <MealItem item={meal} />)

  return (
    <section className={classes.meals}>
      <MealsWrapper>
        <ul>{mapMealsToJSX}</ul>
      </MealsWrapper>
    </section>
  )
}

export default Meals
