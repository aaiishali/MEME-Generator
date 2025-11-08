import React from "react";

export default function Main() {

    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imgUrl:"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes)) 
    }, [])

    function getMemeImage() {
        const randomNum = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNum].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imgUrl: newMemeUrl
        }))
    }

    function handleChange(e){
        const{value} = e.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            topText:value,
        }))
    }

    function handleChange2(e){
        const{value} = e.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            bottomText:value,
        }))
    }
    
    return (
        <>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange2}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imgUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </>
    )
}