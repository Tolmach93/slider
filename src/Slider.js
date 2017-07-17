import React, {Component} from 'react';
import './Slider.css';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
import img5 from './img/5.jpg';


class Slider extends Component {
    constructor() {
        super();
        this.state = {
            active: 1,
            slides: [
                {
                    id: 1,
                    src: img1
                },
                {
                    id: 2,
                    src: img2
                },
                {
                    id: 3,
                    src: img3
                },
                {
                    id: 4,
                    src: img4
                },
                {
                    id: 5,
                    src: img5
                }
            ],
            startSlide: null,
            style: {
                left: -window.innerWidth + 'px'
            }
        };
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.activeSlides = this.activeSlides.bind(this);
    }

    activeSlides() {
        if (this.state.active === 0) {
            return [
                this.state.slides[this.state.slides.length - 1],
                this.state.slides[0],
                this.state.slides[1],
            ];
        } else if (this.state.active === this.state.slides.length - 1) {
            return [
                this.state.slides[this.state.slides.length - 2],
                this.state.slides[this.state.slides.length - 1],
                this.state.slides[0],
            ];
        }
        return [
            this.state.slides[this.state.active - 1],
            this.state.slides[this.state.active],
            this.state.slides[this.state.active + 1],
        ];
    }

    mouseDown(e) {
        e.preventDefault();
        this.setState({startSlide: e.nativeEvent.clientX});
        e.nativeEvent.target.onmousemove = this.mouseMove;
    }

    mouseMove(e) {
        e.preventDefault();
        if (!e.which) {
            e.target.onmousemove = null;
            let direction = e.clientX < this.state.startSlide;
            let left = direction ? -window.innerWidth * 2 + 'px' : '0px';
            let transition = Math.round(window.innerWidth / 3);
            this.setState({
                style: {
                    transition: transition + 'ms',
                    left
                }
            });
            setTimeout(() => {
                let active;
                if (direction && this.state.active === this.state.slides.length - 1) {
                    active = 0;
                } else if (!direction && this.state.active === 0) {
                    active = this.state.slides.length - 1;
                } else {
                    active = (direction) ? this.state.active + 1 : this.state.active - 1;
                }
                return this.setState({
                    active,
                    style: {
                        left: -window.innerWidth + 'px'
                    }
                })
            }, transition);
            return;
        }
        this.setState({
            style: {
                left: -window.innerWidth + e.clientX - this.state.startSlide + 'px'
            }
        });
    }

    render() {
        return (
            <div className="slider" onMouseDown={this.mouseDown}>
                <div style={this.state.style} className="slider__field">
                    {
                        this.activeSlides().map((slide) => <div key={slide.id} className="slider__slide">
                                <img alt="slide" src={slide.src}/>
                            </div>
                        ) }
                </div>
            </div>
        );
    }
}

export default Slider;

