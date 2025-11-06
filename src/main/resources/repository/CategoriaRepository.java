package com.exemplo.documentoapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.documentoapi.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
