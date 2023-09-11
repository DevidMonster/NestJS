import { Carousel } from "antd";

function Banner() {
    return <Carousel style={{ height: '700px', width: '95%', margin: '20px auto', borderRadius: '30px', overflow: 'hidden'}} autoplay>
        <div>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://res.cloudinary.com/dpwto5xyv/image/upload/v1692864281/learnECMAS/White_Yellow_Photo_Work_From_Home_Blog_Banner_op89eo.png" alt="" />
        </div>
        <div>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://res.cloudinary.com/dpwto5xyv/image/upload/v1692864292/learnECMAS/White_Yellow_Photo_Work_From_Home_Blog_Banner_1_iqovti.png" alt="" />
        </div>
        <div>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://res.cloudinary.com/dpwto5xyv/image/upload/v1692864297/learnECMAS/White_Yellow_Photo_Work_From_Home_Blog_Banner_2_cfere6.png" alt="" />
        </div>
    </Carousel>;
}

export default Banner;