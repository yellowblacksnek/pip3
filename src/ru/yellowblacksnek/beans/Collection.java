package ru.yellowblacksnek.beans;

import org.hibernate.Session;
import ru.yellowblacksnek.db.HibernateSessionFactory;
import ru.yellowblacksnek.db.PointEntity;

import javax.persistence.criteria.CriteriaQuery;
import java.util.ArrayList;
import java.util.List;

public class Collection {
    public List<Point> getPoints(){
        Session session = HibernateSessionFactory.getSessionFactory().openSession();

        CriteriaQuery<PointEntity> criteriaQuery = session.getCriteriaBuilder().createQuery(PointEntity.class);
        criteriaQuery.from(PointEntity.class);

        List<PointEntity> pointEntities = session.createQuery(criteriaQuery).getResultList();
        List<Point> points = new ArrayList();
        for (PointEntity each : pointEntities) {
            Point point = new Point();
            point.setX(each.getX());
            point.setY(each.getY());
            point.setR(each.getR());
            point.setMatch(each.getMatch());
            points.add(point);
        }
        session.close();
        return points;
    }

    public void setPoints(List<Point> points) {}

}
