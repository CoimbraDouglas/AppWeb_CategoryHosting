package com.exemplo.documentoapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.documentoapi.model.Documento;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
}
