class FormInputWithLabel extends React.Component {
    constructor(props) {
        super(props);

        this.tagType = this.tagType.bind(this);
    }

    render() {
        return (<div className="form-group">
            <label htmlFor={this.props.id} className="col-lg-2 control-label">
                {this.props.labelText}
            </label>
            <div className="col-lg-10">
                <this.props.elementType
                    className="form-control"
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    type={this.tagType()}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
        </div>);
    }

    tagType() {
        return ({
            input: this.props.inputType,
            textarea: null
        }[this.props.elementType]);
    }
}

FormInputWithLabel.defaultProps = { elementType: 'input', inputType: 'text' };
