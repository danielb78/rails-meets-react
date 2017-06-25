class CreateNewMeetupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            meetup: {
                title: '',
                description: ''
            }
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.formSubmitted = this.formSubmitted.bind(this);
    }

    titleChanged(event) {
        this.state.meetup.title = event.target.value;
        this.forceUpdate();
    }

    descriptionChanged(event) {
        this.state.meetup.description = event.target.value;
        this.forceUpdate();
    }

    formSubmitted(event) {
        event.preventDefault();

        $.ajax({
            url: '/meetups.json',
            type: 'POST',
            // dataType: 'JSON',
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify({meetup: this.state.meetup})
        });
    }

    render() {
        return (<form
            className="form-horizontal"
            onSubmit={this.formSubmitted}
        >
            <fieldset>
                <legend>New Meetup</legend>
                <FormInputWithLabel
                    id="title"
                    value={this.state.meetup.title}
                    onChange={this.titleChanged}
                    placeholder="Meetup title"
                    labelText="Title"
                />
                <FormInputWithLabel
                    id="description"
                    value={this.state.meetup.description}
                    onChange={this.descriptionChanged}
                    placeholder="Meetup description"
                    labelText="Description"
                    elementType="textarea"
                />
                <div className="col-lg-10 col-lg-offset-2">
                    <button className="btn-btn-primary" type="submit">Save</button>
                </div>
            </fieldset>
        </form>);
    }
}

