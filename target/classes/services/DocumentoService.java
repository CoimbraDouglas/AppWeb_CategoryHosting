package com.exemplo.documentosapi.service;

import com.exemplo.documentosapi.model.Categoria;
import com.exemplo.documentosapi.model.Documento;
import com.exemplo.documentosapi.repository.CategoriaRepository;
import com.exemplo.documentosapi.repository.DocumentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentoService {

    private final DocumentoRepository documentoRepository;
    private final CategoriaRepository categoriaRepository;

    public DocumentoService(DocumentoRepository documentoRepository, CategoriaRepository categoriaRepository) {
        this.documentoRepository = documentoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Documento> listarTodos() {
        return documentoRepository.findAll();
    }

    public Documento buscarPorId(Long id) {
        return documentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento não encontrado"));
    }

    public Documento salvar(Documento documento) {
        validarCategoria(documento.getCategoria());
        return documentoRepository.save(documento);
    }

    public Documento atualizar(Long id, Documento documento) {
        Documento existente = buscarPorId(id);
        validarCategoria(documento.getCategoria());

        existente.setTitulo(documento.getTitulo());
        existente.setConteudo(documento.getConteudo());
        existente.setCategoria(documento.getCategoria());

        return documentoRepository.save(existente);
    }

    public void deletar(Long id) {
        documentoRepository.deleteById(id);
    }

    private void validarCategoria(Categoria categoria) {
        if (categoria == null || categoria.getId() == null) {
            throw new RuntimeException("Categoria é obrigatória");
        }
        categoriaRepository.findById(categoria.getId())
                .orElseThrow(() -> new RuntimeException("Categoria informada não existe"));
    }
}
