module.exports = plop => {
  plop.setGenerator('c', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.jsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.jsx.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path:
          'src/components/{{pascalCase name}}/{{pascalCase name}}.styles.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.styles.js.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/{{pascalCase name}}/index.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/index.js.hbs',
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/components/index.js',
        pattern: '/*APPEND COMPONENT IMPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendComponentImport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/components/index.js',
        pattern: '/*APPEND COMPONENT EXPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendComponentExport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/index.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/indexComponents.js.hbs',
      },
    ],
  })
  plop.setGenerator('p', {
    description: 'Create a page',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your page name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.jsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.jsx.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.styles.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.styles.js.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/pages/{{pascalCase name}}/index.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/index.js.hbs',
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/pages/index.js',
        pattern: '/*APPEND COMPONENT IMPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendComponentImport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/pages/index.js',
        pattern: '/*APPEND COMPONENT EXPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendComponentExport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/pages/index.js',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/indexComponents.js.hbs',
      },
    ],
  })
}
