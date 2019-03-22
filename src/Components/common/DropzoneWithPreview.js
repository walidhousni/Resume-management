import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import {UploadFileAction} from "../../actions";
import { connect } from "react-redux";
import UploadIcon from '@material-ui/icons/CloudUpload'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    marginBottom: 8,
    width: '100%',
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    width: 795,
    height: 700,
}



const baseStyle = {
    margin: '0 auto',
    width: '100%',
    height: 700,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
    borderRadius: 20
};
const activeStyle = {
    backgroundColor: '#00b894',
};
const rejectStyle = {
    backgroundColor: '#d63031',
};

const iconDiv = {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
    alignItems: 'center',
    color: 'white',
    fontSize: 20
}

const iconStyle = {
    color: 'white',
    fontSize: 30
}

class DropzoneWithPreview extends Component {
    constructor() {
        super();
        this.state = {
            files: []
        };
    }

    onDrop(files) {
        this.setState({
            files: files.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        });
        const file = files[0];
        if(file)
        {
            const data = new FormData();
            data.append('file', file);
            data.append('name', file.name);
            this.props.UploadFileAction(data)
        }
    }


    componentWillUnmount() {
        // just revoking this data uris to avoid memory leaks!!!!
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }

    render() {
        const {files} = this.state;
        console.log(files)
        const thumbs = files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <embed style={thumbInner}
                        src={file.preview}
                        alt="pdf"
                        pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"
                    />
                </div>
            </div>
        ));

        return (
            <section>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
                { files.length === 0 && 
                    <Dropzone
                        accept="application/pdf"
                        onDrop={this.onDrop.bind(this)}
                    >{({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                        let styles = {...baseStyle}
                        styles = isDragActive ? {...styles, ...activeStyle} : styles
                        styles = isDragReject ? {...styles, ...rejectStyle} : styles
                        return (
                            <div
                                {...getRootProps()}
                                style={styles}
                            >
                                <input {...getInputProps()} />
                                <div style={iconDiv} >
                                    <UploadIcon style={iconStyle} />{isDragAccept ? 'Drop' : 'Drag'}
                                </div>
                            </div>
                        )
                    }}
                    </Dropzone>
                }
            </section>
        );
    }
}

export default connect(null,{UploadFileAction})(DropzoneWithPreview);