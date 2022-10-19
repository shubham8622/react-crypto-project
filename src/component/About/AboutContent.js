import React from 'react'
import AbooutImage from './AbooutImage'

const AboutContent = () => {
  return (
    <>
        <section className="about">
            <div className="container">
                <div className="about-content">
                    <div className="left">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, iure, expedita reprehenderit fugiat consectetur nemo optio obcaecati qui, tempora veritatis maxime laborum! Omnis vero illo ab, voluptatibus dolorum nulla atque voluptatum itaque quod eveniet deleniti vel quae totam voluptates. Nisi eveniet ipsam soluta, et quisquam alias architecto dignissimos dolor inventore, fuga aspernatur. Delectus aut modi, impedit suscipit eligendi reiciendis accusamus?</p>
                    </div>
                    <AbooutImage/>
                </div>
            </div>
        </section>
    </>
  )
}

export default AboutContent