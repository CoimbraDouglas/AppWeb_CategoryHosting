package com.exemplo.documentoapi.services;

import com.exemplo.documentoapi.model.Categoria;
import com.exemplo.documentoapi.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<Categoria> listarTodas() {
        return repository.findAll();
    }

    public Categoria buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    public Categoria salvar(Categoria categoria) {
        return repository.save(categoria);
    }

    public Categoria atualizar(Long id, Categoria categoria) {
        Categoria existente = buscarPorId(id);
        existente.setNome(categoria.getNome());
        existente.setDescricao(categoria.getDescricao());
        return repository.save(existente);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
