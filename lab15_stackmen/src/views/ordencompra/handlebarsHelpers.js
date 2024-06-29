import handlebars from 'handlebars';

// Define el helper eq
handlebars.registerHelper('eq', function(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});

export { handlebars };
