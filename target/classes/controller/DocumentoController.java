package com.exemplo.documentoapi.controller;


import com.exemplo.documentosapi.model.Documento;
import com.exemplo.documentoapi.model.Documento;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {

    private final DocumentoService service;

    public DocumentoController(DocumentoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Documento> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documento> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Documento> criar(@RequestBody Documento documento) {
        return ResponseEntity.ok(service.salvar(documento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Documento> atualizar(@PathVariable Long id, @RequestBody Documento documento) {
        return ResponseEntity.ok(service.atualizar(id, documento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

