/** @jsx React.DOM */
var Editor = React.createClass({
    getInitialState: function() {
        return { source: this.props.value || '' };
    },
    update: function(evt) {
        var val = evt.target.value;
        this.setState({ source: val });
        this.props.save(val);
    },
    focusOnEditor: function() {
        this.refs.editor.getDOMNode().focus();
    },
    render: function() {
        var compiled = this.props.md.makeHtml(this.state.source);
        return (
            <div>
                <textarea className="editor" ref="editor" onChange={this.update} value={ this.state.source } placeholder="Try writing Markdown here" />
                <div className="compiled" dangerouslySetInnerHTML={{ __html: compiled }}/>
            </div>
        );
    }
});

var converter = new Showdown.converter();
var save = function(val) {
    setTimeout(function() {
        localStorage.setItem('source', val);
    }, 0);
};

React.renderComponent(
    <Editor md={ converter } value={ localStorage.getItem('source') || '' } save={ save }/>,
    document.querySelector('#editor'),
    function() {
        this.focusOnEditor();
    }
);
