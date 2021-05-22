import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link'

export default function SectionCarousel(props) {

    const settings = {
        autoplay: true,
        showArrows: true,
        showStatus: false,
        infiniteLoop: true,
        useKeyboardArrows: true,
        stopOnHover: true,
        interval: 6000,
        autoFocus: true,
        swipeable: true,
        showThumbs: false,
    }

    return (
        <Carousel {...settings}>
            {props.data.map(blog => {
                return (
                    <div className="card" style={{ margin: '0' }} key={blog.createdAt}>
                        <div style={{ maxHeight: '600px', overflow: 'hidden', display: "table", content: '', clear: 'both' }}>
                            <div style={{ width: '25%', float: 'left', alignItems: "center", height: '600px', display: 'flex' }}>
                                <span className="card-title" style={{ maxHeight: '100px', overflow: 'hidden', fontWeight: '600', textShadow: '1px 1px #000000', background: 'transparent' }}>{blog.title}</span>
                            </div>
                            <div className="card-image" style={{ width: '75%', float: "left" }}>
                                <img src={blog.imageUrl} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </Carousel>


    )
}