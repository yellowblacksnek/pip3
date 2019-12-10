package ru.yellowblacksnek.beans;

import ru.yellowblacksnek.db.DatabaseOperations;
import ru.yellowblacksnek.db.PointEntity;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.*;


public class Collection {

    @EJB
    private DatabaseOperations dbObj;

    public List<Point> getPoints() {
        List<PointEntity> pointEntities = dbObj.getPointEntities();
        List<Point> points = new ArrayList();
        for (PointEntity each : pointEntities) {
            Point point = new Point();
            point.setX(each.getX());
            point.setY(each.getY());
            point.setR(each.getR());
            point.setMatch(each.getMatch());
            points.add(point);
        }
        return points;
    }

    public void setPoints(List<Point> points) {}

}
