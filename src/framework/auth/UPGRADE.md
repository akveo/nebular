<a name="2.0.0-rc.8-2.0.0-rc.9"></a>
# 2.0.0-rc.8-2.0.0-rc.9

1. Change imports to new correct strategy names:

- `NbDummyAuthProvider` -> `NbDummyAuthStrategy`
- `NbEmailPassAuthProvider` -> `NbPasswordAuthStrategy` (could be used not only with `email`)
- `NbAbstractAuthProvider` -> `NbAuthStrategy`


2. Change auth forms configuration `provider` key to `strategy`, so instead of 

```
`NbAuthModule.forRoot({
  forms: {
     login: {
       provider: 'email',
     },
  },
})`
```

should be:
```
`NbAuthModule.forRoot({
  forms: {
     login: {
       strategy: 'email', // provider -> strategy
     },
  },
})` 
```

3. Register strategies through special `setup` method, so instead of the object:

```
strategies: {
  email: {
    service: NbEmailPassAuthProvider,
    config: { ... }
  }
}
```

should be this an array: 

```
strategies: [
  NbPasswordAuthStrategy.setup({ name: 'email', ... }),
]
```

Strategy configuration is type-checked now.

4. Remove `NB_AUTH_TOKEN_CLASS` imports and usage.
Token class is passed through strategy configuration, like this:

```
@NgModule({
  imports: [
   // ...

   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',

             token: {
               class: NbAuthJWTToken,  // <----
             }
           }),
         ],
       }),
  ],
});
```

In case you have a custom token - add `NAME` static property.
