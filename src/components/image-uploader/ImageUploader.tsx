import { Component } from 'react';
import "./ImageUploader.styles.css";

interface IState {
    image: any;
    preview: string | ArrayBuffer | null;
}

interface IProps {
    image?: any;
    uploadPicture(picture: any): void;
}

class ImageUploaderBase extends Component<IProps, IState> { 
    constructor(props: IProps) {
        super(props);
        this.state = {
            image: props.image,
            preview: 'https://images.pexels.com/photos/4409273/pexels-photo-4409273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        }
    }
   
    public componentDidMount() {
        this.setState({
            image: this.props.image,
            preview: !!this.props.image ? 'data:image/png;base64,' + this.props.image.img.data : 'https://images.pexels.com/photos/4409273/pexels-photo-4409273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        })
    }

    public handleImageChange = (e: any) => {
        e.preventDefault();
        let reader = new FileReader();
        let inFile = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ 
                image: inFile,
                preview: reader.result
            }, () => this.props.uploadPicture(this.state.image))
        };
        reader.readAsDataURL(inFile);
        
    };

    public render() {
        return (
            <div className="input-container">
                <div className="avatar-upload">
                    <div className="avatar-edit">
                        <input type='file' id="imageUpload" onChange={this.handleImageChange} className="input-field" accept=".png, .jpg, .jpeg" />
                        <label htmlFor="imageUpload" className="image-input-label"></label>
                    </div>
                    <div className="avatar-preview">
                        <div id="imagePreview" style={{backgroundImage: `url(${this.state.preview})`}}></div>
                    </div>
                </div>
            </div>
        )
    }
}


const ImageUploader = ImageUploaderBase;

export { ImageUploader }
