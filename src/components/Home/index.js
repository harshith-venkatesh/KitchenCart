import React from 'react'
import { useNavigate } from 'react-router-dom'
import className from './Home.module.css'
export const HomeContainer = () => {
    const navigate = useNavigate()
    return (
        <div className={className.home__container}>
            <>Home</>
			<button
                  className='btn btn-solid-primary'
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </button>
        </div>
    )
}
