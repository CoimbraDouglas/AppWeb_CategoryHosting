//Perfeito 👌 Vamos fazer isso passo a passo!

/*
A seguir está um guia completo para desenvolver uma aplicação Spring Boot com CRUD, relacionamento entre entidades, Swagger e deploy no Render, usando o VS Code.

🧩 1. Preparação do ambiente
✅ Pré-requisitos instalados

Antes de começar, garanta que você tenha:

Java 17 ou superior

Maven (mvn -v para verificar)

Git

VS Code com extensões:

Spring Boot Extension Pack

Java Extension Pack

Conta no Render (https://render.com)

⚙️ 2. Criar o projeto Spring Boot

Acesse https://start.spring.io
 e configure:

Campo	Valor
Project	Maven Project
Language	Java
Spring Boot	3.x
Packaging	Jar
Java	17
Group	com.exemplo
Artifact	documentoapi
Name	documentoapi
Dependencies	Spring Web, Spring Data JPA, H2 Database, Spring Boot DevTools, Springdoc OpenAPI (Swagger)

Baixe o projeto .zip, extraia e abra a pasta no VS Code.

🧱 3. Criar as entidades
📄 Documento.java
package com.exemplo.documentoapi.model;

import jakarta.persistence.*;

@Entity
public class Documento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String conteudo;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    // Getters e Setters
}

🗂️ Categoria.java
package com.exemplo.documentoapi.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    private List<Documento> documentos;

    // Getters e Setters
}

💾 4. Criar os repositórios

Crie a pasta repository e adicione:

DocumentoRepository.java
package com.exemplo.documentoapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.documentoapi.model.Documento;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
}

CategoriaRepository.java
package com.exemplo.documentoapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.documentoapi.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}

🧠 5. Criar os controladores

Crie a pasta controller e adicione:

CategoriaController.java
package com.exemplo.documentoapi.controller;

import com.exemplo.documentoapi.model.Categoria;
import com.exemplo.documentoapi.repository.CategoriaRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaRepository repository;

    public CategoriaController(CategoriaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Categoria> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Categoria criar(@RequestBody Categoria categoria) {
        return repository.save(categoria);
    }

    @GetMapping("/{id}")
    public Categoria buscar(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    @PutMapping("/{id}")
    public Categoria atualizar(@PathVariable Long id, @RequestBody Categoria categoria) {
        categoria.setId(id);
        return repository.save(categoria);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

DocumentoController.java
package com.exemplo.documentoapi.controller;

import com.exemplo.documentoapi.model.Documento;
import com.exemplo.documentoapi.repository.DocumentoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {

    private final DocumentoRepository repository;

    public DocumentoController(DocumentoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Documento> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Documento criar(@RequestBody Documento documento) {
        return repository.save(documento);
    }

    @GetMapping("/{id}")
    public Documento buscar(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Documento não encontrado"));
    }

    @PutMapping("/{id}")
    public Documento atualizar(@PathVariable Long id, @RequestBody Documento documento) {
        documento.setId(id);
        return repository.save(documento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

🧩 6. Configurar o banco H2

Em src/main/resources/application.properties:

spring.datasource.url=jdbc:h2:mem:documentosdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true

# Swagger
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html

📘 7. Testar localmente

Rode o projeto:
```
mvn spring-boot:run
```

Acesse:

API: http://localhost:8080/documentos ou http://localhost:8080/categorias

Swagger: http://localhost:8080/swagger-ui.html

🚀 8. Criar repositório no GitHub

No GitHub → New Repository

Nome: documento-api

Clone seu projeto e envie:

```
git init
git add .
git commit -m "Projeto CRUD Documento e Categoria"
git branch -M main
git remote add origin https://github.com/seu-usuario/documento-api.git
git push -u origin main
```

☁️ 9. Fazer deploy no Render

Acesse https://render.com

Clique em New → Web Service

Conecte ao GitHub e escolha o repositório.

Configure:

Environment: Java

Build Command: mvn clean install

Start Command: java -jar target/documentoapi-0.0.1-SNAPSHOT.jar

Aguarde o deploy e copie a URL:

https://documentoapi.onrender.com

🧾 10. Criar o README.md

Crie o arquivo README.md na raiz do projeto com:

# 📄 Documento API

API REST desenvolvida com Spring Boot para gerenciar Documentos e Categorias.

## 🚀 Funcionalidades
- CRUD completo de Categorias e Documentos
- Relacionamento entre entidades
- Banco de dados H2 (em memória)
- Documentação com Swagger

## 🧰 Tecnologias
- Java 17
- Spring Boot 3
- Spring Data JPA
- H2 Database
- Swagger (Springdoc OpenAPI)
- Deploy no Render

## ▶️ Execução local
```bash
mvn spring-boot:run
```

Acesse:

```
API: http://localhost:8080
```
```
Swagger: http://localhost:8080/swagger-ui.html
```

🌐 Deploy no Render

https://seu-projeto-render.onrender.com

📘 Documentação Swagger

https://seu-projeto-render.onrender.com/swagger-ui.html

🎥 Vídeos de apoio

Como subir Spring Boot no Render

CRUD Spring Boot com JPA

📚 Referência Swagger

Documentação oficial do Swagger


---

Quer que eu gere **os arquivos do projeto prontos** (para baixar e abrir no VS Code)?  
Posso montar o esqueleto com o código acima num `.zip`.
*/