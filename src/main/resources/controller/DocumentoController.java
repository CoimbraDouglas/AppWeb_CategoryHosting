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
