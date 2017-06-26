class CreateNewMeetupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            meetup: {
                title: '',
                description: '',
                date: new Date(),
                seoText: null
            }
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.formSubmitted = this.formSubmitted.bind(this);
        this.dateChanged = this.dateChanged.bind(this);
        this.seoChanged = this.seoChanged.bind(this);
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
        const meetup = this.state.meetup;

        $.ajax({
            url: '/meetups.json',
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify({
                meetup: {
                    title: meetup.title,
                    description: meetup.description,
                    seo: meetup.seoText || this.computeDefaultSeoText(),
                    date: `${meetup.date.getFullYear()}-${meetup.date.getMonth() + 1}-${meetup.date.getDate()}`
                }
            })
        });
    }

    dateChanged(newDate) {
        this.state.meetup.date = newDate;
        this.forceUpdate();
    }

    seoChanged(seoText) {
        this.state.meetup.seoText = seoText;
        this.forceUpdate();
    }

    computeDefaultSeoText() {
        const words = this.state.meetup.title.toLowerCase().split(/\s+/);

        words.push(monthName(this.state.meetup.date.getMonth()));
        words.push(this.state.meetup.date.getFullYear().toString());

        return words.filter(
            (string) => string.trim().length > 0
        ).join('-').toLowerCase();
    }

    render() {
        const btnStyle = {
            paddingLeft: '5px'
        };

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
                <DateWithLabel
                    onChange={this.dateChanged}
                    date={this.state.meetup.date}
                />
                <FormInputWithLabelAndReset
                    id={this.seo}
                    value={this.state.meetup.seoText ? this.state.meetup.seoText : this.computeDefaultSeoText()}
                    onChange={this.seoChanged}
                    placeholder="SEO text"
                    labelText="seo"
                />
                <div className="col-lg-10 col-lg-offset-2" style={btnStyle}>
                    <button className="btn btn-default" type="submit">Save</button>
                </div>
            </fieldset>
        </form>);
    }
}

