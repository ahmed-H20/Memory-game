import { useEffect, useState } from "react"

export default function Game() {
    const [imgData, setImgData] = useState([])
    const [imagesId, setImagesId] = useState([])
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    useEffect(()=>{
        fetch('https://api.giphy.com/v1/gifs/trending?key=84uJ4Sl6FWDcFxWh6BEWUsGJGL8WsTmo&limit=12')
        .then(res => res.json())
        .then(images => setImgData(images.data))
    }, [])
    
    const handleChange = (id)=>{
        
        if(imagesId.includes(id)){
            alert("Game over")
            setImgData([])
            setImagesId([])
            setBestScore(bestScore>score?bestScore:score)
            setScore(0)
        }
        else{
            setScore(score+1)
            setImagesId([...imagesId, id])
        }
        console.log(imagesId)
        const changedData = imgData.slice().sort(() => Math.random() - 0.5)
        setImgData(changedData)
    }

    return (
        <>
            <section>
                <h1>Memory Game </h1>
                <p>How TO Play: if you choose image twice you lose</p>
            </section>
            <h3>Score: {score}</h3>
            <h3>Best Score: {bestScore}</h3>
            <br />
            <div className="images">     
                {imgData.map((image)=>(                    
                        <img key={image.id} src={image.images.original.url} alt={image.title} onClick={() => handleChange(image.id)}/>                       
                    
                ))}
            </div>
        </>
    )
}