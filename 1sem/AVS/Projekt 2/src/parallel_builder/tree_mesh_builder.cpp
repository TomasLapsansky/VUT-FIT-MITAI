/**
 * @file    tree_mesh_builder.cpp
 *
 * @author  TOMAS LAPSANSKY <xlapsa00@stud.fit.vutbr.cz>
 *
 * @brief   Parallel Marching Cubes implementation using OpenMP tasks + octree early elimination
 *
 * @date    15.12.2019
 **/

#include <iostream>
#include <math.h>
#include <limits>

#include "tree_mesh_builder.h"

TreeMeshBuilder::TreeMeshBuilder(unsigned gridEdgeSize)
    : BaseMeshBuilder(gridEdgeSize, "Octree")
{

}

unsigned TreeMeshBuilder::evalTree(const Vec3_t<float> &position, const ParametricScalarField &field, size_t cubeSize) {

    //if cubeSize > minCubeSize
    //cut-off cube and call evalTree with new position and cubeSize
    unsigned totalTriangles = 0;

    if(cubeSize > 1) {
        //calculate middle point
        unsigned x = position.x + cubeSize/2;
        unsigned y = position.y + cubeSize/2;
        unsigned z = position.z + cubeSize/2;

        Vec3_t<float> middlePoint(x*mGridResolution, y*mGridResolution, z*mGridResolution);

        float f = field.getIsoLevel() + (sqrt(3)/2)*(cubeSize*mGridResolution);

        if(evaluateFieldAt(middlePoint, field) > f)
            return 0;

        for(int xCube = 0; xCube < 2; xCube++) {
            for(int yCube = 0; yCube < 2; yCube++) {
                for(int zCube = 0; zCube < 2; zCube++) {
                    
                    #pragma omp task shared(totalTriangles)
                    {
                        Vec3_t<float> cube(position.x + xCube*(cubeSize/2), position.y + yCube*(cubeSize/2), position.z + zCube*(cubeSize/2));
                        unsigned tmp = evalTree(cube, field, cubeSize/2);

                        #pragma omp critical
                        totalTriangles += tmp;
                    }
                }
            }
        }

    } else {
        unsigned tmp = buildCube(position, field);

        #pragma omp critical
        totalTriangles += tmp;
    }

    #pragma omp taskwait
    return totalTriangles;
}

unsigned TreeMeshBuilder::marchCubes(const ParametricScalarField &field)
{
    unsigned totalTriangles = 0;
    Vec3_t<float> cubeOffset(0, 0, 0);

    #pragma omp parallel
    #pragma omp single
    totalTriangles = evalTree(cubeOffset, field, mGridSize);

    return totalTriangles;
}

float TreeMeshBuilder::evaluateFieldAt(const Vec3_t<float> &pos, const ParametricScalarField &field)
{
    const Vec3_t<float> *pPoints = field.getPoints().data();
    const unsigned count = unsigned(field.getPoints().size());

    float value = std::numeric_limits<float>::max();

    for(unsigned i = 0; i < count; ++i)
    {
        float distanceSquared  = (pos.x - pPoints[i].x) * (pos.x - pPoints[i].x);
        distanceSquared       += (pos.y - pPoints[i].y) * (pos.y - pPoints[i].y);
        distanceSquared       += (pos.z - pPoints[i].z) * (pos.z - pPoints[i].z);

        value = std::min(value, distanceSquared);
    }

    return sqrt(value);
}

void TreeMeshBuilder::emitTriangle(const BaseMeshBuilder::Triangle_t &triangle)
{
    #pragma omp critical
    mTriangles.push_back(triangle);
}