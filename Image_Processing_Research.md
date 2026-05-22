
# Image Processing Fundamentals

## 1. Neighbor Pixels

Pixels in an image have neighbors around them. There are two types:

### 4-Neighbors

A pixel has 4 direct neighbors that share an edge:

- Top, Bottom, Left, Right

```
     N
   W P E
     S
```

### 8-Neighbors

A pixel has 8 neighbors including corners:

- The 4 direct neighbors + 4 diagonal neighbors

```
   NW  N  NE
   W   P   E
   SW  S  SE
```

**Example**: For pixel at (3,3):

- 4-neighbors: (3,2), (3,4), (2,3), (4,3)
- 8-neighbors: adds (2,2), (2,4), (4,2), (4,4)

## 2. Connectivity

Connectivity shows which pixels belong to the same region.

- **4-Connectivity**: Pixels connected horizontally or vertically only
- **8-Connectivity**: Pixels connected horizontally, vertically, or diagonally

**Why it matters**: 4-connectivity may split diagonal regions, while 8-connectivity keeps them together.

---

## 3. Distance Measures

Distance measures tell us how far two pixels are from each other.

### Euclidean Distance

The straight-line distance (like measuring with a ruler).

**Formula**: d = √[(x₂-x₁)² + (y₂-y₁)²]

**Example**: From (1,1) to (4,5)

- d = √[(4-1)² + (5-1)²] = √[9+16] = 5 pixels

### City-Block Distance (Manhattan)

Distance moving only horizontally and vertically (like walking city blocks).

**Formula**: d = |x₂-x₁| + |y₂-y₁|

**Example**: From (1,1) to (4,5)

- d = |4-1| + |5-1| = 3 + 4 = 7 pixels

### Chessboard Distance

Maximum of horizontal or vertical distance (like a chess king's move).

**Formula**: d = max(|x₂-x₁|, |y₂-y₁|)

**Example**: From (1,1) to (4,5)

- d = max(3, 4) = 4 pixels

**Quick Comparison**:

- Euclidean: Most accurate, slower
- City-block: Medium accuracy, faster
- Chessboard: Least accurate, fastest

---

## 4. Image Enhancement

Enhancement makes images look better or more useful.

### Point Processing

Changes each pixel individually without looking at neighbors.

**Common Methods**:

1. **Brightness**: Add/subtract value to make lighter/darker
   - Formula: new = old + c

2. **Contrast**: Multiply to increase/decrease difference between light and dark
   - Formula: new = old × c

3. **Thresholding**: Convert to black and white
   - Formula: new = 255 if old > T, else 0

4. **Histogram Equalization**: Spread out pixel values for better contrast

**Advantage**: Fast and simple.

### Neighborhood Processing

Changes each pixel based on its neighbors (also called spatial filtering).

**Common Methods**:

1. **Smoothing (Blur)**: Average neighbors to reduce noise
   - Makes image softer
   - Removes small details

2. **Sharpening**: Emphasize differences to enhance edges
   - Makes image clearer
   - Shows more details

3. **Edge Detection**: Find boundaries between objects
   - Detects where brightness changes quickly
   - Used in object recognition

4. **Median Filter**: Remove salt-and-pepper noise
   - Replace pixel with middle value of neighbors
   - Keeps edges sharp

**How it works**:

1. Take a small window (like 3×3 pixels)
2. Do math on those pixels
3. Put result in center
4. Move window and repeat

**Advantage**: More powerful, can remove noise and find patterns.

---

## Summary

- **Neighbors**: 4-neighbors (edges) or 8-neighbors (edges + corners)
- **Connectivity**: How pixels connect to form regions
- **Distance**: Euclidean (straight), City-block (grid), Chessboard (max)
- **Enhancement**: Point processing (individual) or Neighborhood processing (groups)

These basics are used in face recognition, medical imaging, photo editing, and many other applications.
