# Manutenção do projeto

Aqui você encontra tutoriais gerais de como manter a biblioteca para o Angular e dessa documentação.

<hr>

## Publicar nova versão do pacote no CodeArtifacts

### Publicar

Execute os seguintes comandos na raiz do projeto:

```bash
npm run prebuild:packages
npm run build:packages
```

Navegar para a pasta `dist` e depois para dentro dos pacotes desejados. Na pasta do pacote desejado, executar `npm pack` e subir o arquivo `.tar.gz` para a release do github.

<hr>

## Criar novo componente

Para criar um novo componente, você deve executar o seguinte comando na raiz do projeto:

```
ng g .:new-component ComponentName
```

Com o componente criado, você deve seguir os seguintes passos para o mesmo funcionar corretamente no pacote e na documentação:

1. Exportar o `.module` e o `.component` do componente criado em `src/framework/theme/public_api.ts`
2. Incluir o tema _scss_ criado em `src/framework/theme/styles/global/_components.scss` (@forward, @use e @include)
3. Analisar a necessidade de incluir o tema _scss_ em `docs/app/@theme/styles/styles.scss`
4. Criar o _playground_ do componente em `src/playground/with-layout/component-name`, com rota e módulo próprios
5. Atualizar o arquivo `docs/structure.ts`, seguindo os exemplos já existentes no mesmo, para que o componente apareça na documentação

Durante o desenvolvimento:

1. Executar o comando `npm run gen:playground && npm run gen:playground-module && npm run gen:playground-components` para criar uma rota testável do componente
2. Executar o comando `npm run start` para servir a aplicação na porta 4200.

### Documentação do componente

O componente criado a partir do comando acima fica localizado na pasta `src/framework/theme/components/component-name`.
Por sua vez, toda a documentação do componente fica disponível em `src/framework/theme/components/component-name/component-name.component.ts`.

A documentação é escrita em forma de comentário acima do `@Component()` do arquivo. Ela suporta a linguagem markdown
e para adicionar o preview do componente é preciso utilizar `@stacked-example(Name, component-name/component-name.component)`, o caminho `component-name/component-name.component` é uma referência para a pasta `src/playground/**/component-name/component-name.component`.

Os cards laterais "Overview", "Tema", "Exemplos" e "API" são criados da seguinte forma:

- **Overview**: é definido pela documentação do componente
- **Tema**: é definido pela anotação `@styles` presente na documentação do componente
- **Exemplos**: também é definido pela documentação do componente, mas sem os textos. Apenas os `stacked-example` são renderizados.
- **API**: é definido pelos comentários nos métodos do componente, como os `@Input()`, `@Output()` e métodos

<hr>

## Criar nova página de documentação

As páginas textuais de documentação ficam na pasta `docs/articles/**/*.md` e são escritas em markdown.

Para a página criada aparecer no menu lateral, é preciso atualizar o arquivo `docs/structure.ts`, seguindo os exemplos já existentes no mesmo.

**Uma página sempre precisa ter um "parente", não é possível criar uma página no nível raiz!**

<hr>

## Onde atualizar os design tokens

Os design tokens ficam localizados nos seguintes arquivos:

1. `src/framework/theme/styles/themes/_default.scss`: aqui ficam os design tokens do tema, a maioria dos tokens dos componentes específicos herda dele. Se possível, o ideal é sempre alterar os tokens nesse arquivo.
2. `src/framework/theme/styles/themes/_mapping.scss`: aqui ficam os design tokens específicos dos componentes, que herdam os tokens do tema. Se possível, o ideal é sempre evitar alteração dos tokens específicos dos componentes para manter uma consistência entre todos eles.
