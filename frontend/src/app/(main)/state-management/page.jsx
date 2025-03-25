'use client';
import React, { useState } from 'react'

const StateManagement = () => {


    // let count = 0;

    const [count, setCount] = useState(0);

    return (
        <div>

            <h1 className='text-center font-bold my-10 text-5xl'>Event Handling</h1>

            <button className='border p-2' onClick={() => { alert('button was clicked') }}>
                Click Me  </button>

            <input className='border p-2' type="text"
                onChange={(e) => { console.log(e.target.value); }}
            />

            <button className='block mt-4 border p-2'
                onClick={() => { setCount(count + 1); console.log(count) }}
            >Counter </button>
            <h1 className='text-4xl'> {count}</h1>
        </div>
    )
}

export default StateManagement;