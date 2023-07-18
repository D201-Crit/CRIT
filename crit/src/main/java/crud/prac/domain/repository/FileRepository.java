package crud.prac.domain.repository;

import crud.prac.domain.FileUpload;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileUpload,Long>{
}
