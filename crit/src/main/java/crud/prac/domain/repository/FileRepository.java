package crud.prac.domain.repository;

import crud.prac.domain.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity,Long>{
}
