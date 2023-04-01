const getHistory = async () => {
    try {
        const res = await fetch('http://localhost:4000/history')
        // if(res.status===201)        
        if (res.ok) {
            const history = res.json()
            return history        
          } else throw new error('Error, cannot get data!')
    } catch (error) {
        console.log(error)
    }
  }
  export { getHistory }