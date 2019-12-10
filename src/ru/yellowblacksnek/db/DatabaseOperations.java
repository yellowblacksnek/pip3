package ru.yellowblacksnek.db;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import javax.ejb.*;

@Stateless
public class DatabaseOperations {

    @PersistenceContext(unitName = "unit")
    private EntityManager em;

    public void addResultInDb(PointEntity point) {
        try
        {
            EntityManager em = getEntityManager();
            boolean unique = true;
            List<PointEntity> pointEntities = getPointEntities();
            for(PointEntity p : pointEntities) {
                if(p.equals(point)) {
                    unique = false;
                    break;
                }
            }
            if(unique) {
                em.persist(point);
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public List<PointEntity> getPointEntities() {
        EntityManager em = getEntityManager();
        CriteriaQuery<PointEntity> criteriaQuery = em.getCriteriaBuilder().createQuery(PointEntity.class);
        criteriaQuery.from(PointEntity.class);
        List<PointEntity> pointEntities = em.createQuery(criteriaQuery).getResultList();
        return pointEntities;
    }

    public EntityManager getEntityManager() {
        if(em == null) {
            System.out.println("EntityManager почему-то null");
        }
        return em;
    }
}
