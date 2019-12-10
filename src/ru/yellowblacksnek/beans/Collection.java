package ru.yellowblacksnek.beans;

import ru.yellowblacksnek.db.DatabaseOperations;
import ru.yellowblacksnek.db.PointEntity;

import javax.naming.Context;
import javax.naming.InitialContext;
import java.util.ArrayList;
import java.util.List;

import static ru.yellowblacksnek.Constants.DATABASEOPERATIONS_JNDI;

public class Collection {
    public List<Point> getPoints() {
        DatabaseOperations dbObj = null;
        try {
            Context context = new InitialContext();
            dbObj = (DatabaseOperations) context.lookup(DATABASEOPERATIONS_JNDI);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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
